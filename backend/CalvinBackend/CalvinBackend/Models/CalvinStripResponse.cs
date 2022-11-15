using System;
namespace Calvin.Models
{
    public class CalvinStripResponse
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string ComicStripBase64 { get; set; }
        public DateOnly? DateOfPrint { get; set; }
        public DateOnly? DisplayedDate { get; set; }
        public bool SundayComic { get; set; }
    }
}

