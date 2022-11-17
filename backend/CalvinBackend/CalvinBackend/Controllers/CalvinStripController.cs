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
        public async Task<ActionResult<CalvinStripResponse>> GetCalvinStrips()
        {
            if (_context.CalvinStrips == null)
            {
                return NotFound();
            }
            DateTime start = DateTime.Parse(Constants.startDate,
                            System.Globalization.CultureInfo.InvariantCulture);
            DateTime today = DateTime.Today;
            var diffOfDates = today - start;
            var calvinStrip = await _context.CalvinStrips.FindAsync(diffOfDates.Days);

            if (calvinStrip == null)
            {
                return NotFound();
            }

            var str = System.Text.Encoding.Default.GetString(calvinStrip.ComicStrip);
            DateOnly dateOfPrint = (DateOnly)calvinStrip.DateOfPrint;
               
            CalvinStripResponse ret = new CalvinStripResponse() // contributed by Zach Jones
            {
                ComicStripBase64 = str,
                DateOfPrint = dateOfPrint,
                DisplayedDate = DateOnly.FromDateTime(DateTime.Now), 
                FileName = calvinStrip.FileName,
                Id = calvinStrip.Id,
                SundayComic = calvinStrip.SundayComic.Value,
            };

            return ret;
        }

        // GET: api/CalvinStrip/5
        [HttpGet("ids/{id?}")]
        public async Task<ActionResult<CalvinStripResponse>> GetCalvinStrip(int id)
        {
            //Convert.ToBase64String(b);
            if (_context.CalvinStrips == null)
            {
                return NotFound();
            }
            var calvinStrip = await _context.CalvinStrips.FindAsync(id);
            var temp3 = await _context.CalvinStrips.FindAsync(3);

            if (calvinStrip == null)
            {
                return NotFound();
            }
            var str = System.Text.Encoding.Default.GetString(calvinStrip.ComicStrip);
            DateOnly dateOfPrint = (DateOnly)calvinStrip.DateOfPrint;
            DateTime dateOfPrintDT = dateOfPrint.ToDateTime(TimeOnly.Parse("12:00 AM"));

            CalvinStripResponse ret = new CalvinStripResponse()
            {
                ComicStripBase64 = str,
                DateOfPrint = dateOfPrint,
                DisplayedDate = DateOnly.FromDateTime(DateTime.Now),
                FileName = calvinStrip.FileName,
                Id = calvinStrip.Id,
                SundayComic = calvinStrip.SundayComic.Value,

            };
            
            return Ok(ret);
        }

        [HttpGet("ids/")]
        public async Task<ActionResult<IEnumerable<CalvinStripResponse>>> GetCalvinStrips([FromQuery] IList<int> ids)
        {
            //Convert.ToBase64String(b);
            if (_context.CalvinStrips == null)
            {
                return NotFound();
            }

            var ret = new List<CalvinStripResponse>();

            foreach (int id in ids)
            {
                var calvinStrip = await _context.CalvinStrips.FindAsync(id);
                if (calvinStrip != null)
                {
                    string str = System.Text.Encoding.Default.GetString(calvinStrip.ComicStrip);
                    DateOnly? dateOfPrint = null;

                    if (calvinStrip.DateOfPrint != null)
                    {
                        dateOfPrint = (DateOnly)calvinStrip.DateOfPrint;
                    }
                    var temp = new CalvinStripResponse()
                    {
                        ComicStripBase64 = str,
                        DateOfPrint = dateOfPrint,
                        DisplayedDate = DateOnly.FromDateTime(DateTime.Now),
                        FileName = calvinStrip.FileName,
                        Id = calvinStrip.Id,
                        SundayComic = calvinStrip.SundayComic.Value,

                    };
                    ret.Add(temp);
                }
            }
            return Ok(ret);
        }

        // GET: api/CalvinStrip/date/1985-11-18
        [HttpGet("dates/{date}")]
        public async Task<ActionResult<CalvinStripResponse>> GetCalvinStrip(DateOnly date)
        {
            var givenDateOnly = date;
            
            if (_context.CalvinStrips == null)
            {
                return NotFound();
            }
            var query = from db in _context.CalvinStrips
                        where db.DateOfPrint.Equals(givenDateOnly)
                        select db;

            var calvinStrip = await query.FirstAsync();

            if (calvinStrip == null)
            {
                return NotFound();
            }

            string str = "";

            if(calvinStrip.ComicStrip != null)
            {
                str = System.Text.Encoding.Default.GetString(calvinStrip.ComicStrip);
            }
            else
            {
                return NotFound();
            }

            DateOnly? dateOfPrint = null;

            if (calvinStrip.DateOfPrint != null)
            {
                dateOfPrint = (DateOnly)calvinStrip.DateOfPrint;
            }
            else
            {
                return NotFound();
            }

            
            CalvinStripResponse ret = new CalvinStripResponse()
            {
                ComicStripBase64 = str,
                DateOfPrint = dateOfPrint,
                DisplayedDate = DateOnly.FromDateTime(DateTime.Now),
                FileName = calvinStrip.FileName,
                Id = calvinStrip.Id,
                SundayComic = calvinStrip.SundayComic.Value,

            };

            return Ok(ret);
        }
        private bool CalvinStripExists(int id)
        {
            return (_context.CalvinStrips?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
