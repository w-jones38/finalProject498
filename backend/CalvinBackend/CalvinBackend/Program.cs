using Calvin.Data;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using DateOnlyTimeOnly.AspNet;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDateOnlyTimeOnlyStringConverters();
builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerGen(c => c.UseDateOnlyTimeOnlyStringConverters());

builder.Services.AddDbContext<CalvinContext>(options =>
{
    options.UseMySql(builder.Configuration.GetConnectionString("CalvinDb"),
    Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.31-mysql"));
});

var app = builder.Build();

app.UseCors(options =>
    options
    .AllowAnyMethod()
    .AllowAnyHeader());

// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

