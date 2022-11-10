using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Calvin.Data;
using Calvin.Models;

namespace CalvinBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalvinStripController : ControllerBase
    {
        private readonly CalvinContext _context;

        public CalvinStripController(CalvinContext context)
        {
            _context = context;
        }

        // GET: api/CalvinStrip
        [HttpGet]
        public async Task<ActionResult<CalvinStrip>> GetCalvinStrips()
        {
          if (_context.CalvinStrips == null)
          {
              return NotFound();
          }
            DateTime start = DateTime.Parse(Constants.startDate,
                            System.Globalization.CultureInfo.InvariantCulture);
            DateTime today = DateTime.Today;
            var diffOfDates = today - start;
            var createStrip = await _context.CalvinStrips.FindAsync(diffOfDates.Days+1); //will be zero for day one and indexs dont start until 1

            if (createStrip == null)
            {
                return NotFound();
            }

            return createStrip;
        }

        // GET: api/CalvinStrip/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CalvinStripResponse>> GetCalvinStrip(int id)
        {
            //Convert.ToBase64String(b);
          if (_context.CalvinStrips == null)
          {
              return NotFound();
          }
            var calvinStrip = await _context.CalvinStrips.FindAsync(id);

            if (calvinStrip == null)
            {
                return NotFound();
            }
            var str = System.Text.Encoding.Default.GetString(calvinStrip.ComicStrip);
            CalvinStripResponse ret = new CalvinStripResponse()
            {
                ComicStripBase64 = str,//Convert.ToBase64String(calvinStrip.ComicStrip),
                DateOfPrint = DateTime.UtcNow,
                DisplayedDate = DateTime.UtcNow,
                FileName = calvinStrip.FileName,
                Id = calvinStrip.Id,
                SundayComic = calvinStrip.SundayComic.Value,

            };
            
            return Ok(ret);
        }

        // PUT: api/CalvinStrip/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCalvinStrip(int id, CalvinStrip calvinStrip)
        {
            if (id != calvinStrip.Id)
            {
                return BadRequest();
            }

            _context.Entry(calvinStrip).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CalvinStripExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CalvinStrip
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CalvinStrip>> PostCalvinStrip(CalvinStrip calvinStrip)
        {
          if (_context.CalvinStrips == null)
          {
              return Problem("Entity set 'CalvinContext.CalvinStrips'  is null.");
          }
            _context.CalvinStrips.Add(calvinStrip);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCalvinStrip", new { id = calvinStrip.Id }, calvinStrip);
        }

        // DELETE: api/CalvinStrip/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCalvinStrip(int id)
        {
            if (_context.CalvinStrips == null)
            {
                return NotFound();
            }
            var calvinStrip = await _context.CalvinStrips.FindAsync(id);
            if (calvinStrip == null)
            {
                return NotFound();
            }

            _context.CalvinStrips.Remove(calvinStrip);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CalvinStripExists(int id)
        {
            return (_context.CalvinStrips?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
