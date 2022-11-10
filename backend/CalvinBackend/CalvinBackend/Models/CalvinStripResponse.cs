using System;
namespace Calvin.Models
{
    public class CalvinStripResponse
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string ComicStripBase64 { get; set; }
        public DateTime DateOfPrint { get; set; }
        public DateTime? DisplayedDate { get; set; }
        public bool SundayComic { get; set; }
    }
}

