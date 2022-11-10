using System;
using System.Collections.Generic;

namespace Calvin.Models
{
    public partial class CalvinStrip
    {
        public int Id { get; set; }
        public string? FileName { get; set; }
        public byte[]? ComicStrip { get; set; }
        public DateOnly? DateOfPrint { get; set; }
        public DateOnly? DisplayedDate { get; set; }
        public bool? SundayComic { get; set; }
    }
}
