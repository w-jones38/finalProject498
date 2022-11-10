using System.Net;
using System.Net.Http.Headers;
using System.Drawing;



var client = new HttpClient(); // no HttpServer

var request = new HttpRequestMessage
{
    RequestUri = new Uri("https://localhost:7144/api/CalvinStrip/2"),
    Method = HttpMethod.Get
};

request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


byte[] bytes = Convert.FromBase64String("R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==");

Image image;
using (MemoryStream ms = new MemoryStream(bytes))
{
    image = Image.FromStream(ms);
}

int l = 8;