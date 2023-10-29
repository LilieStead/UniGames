using UniGames.Api.Mappings;
using AutoMapper;
using UniGames.Api.Data;
using Microsoft.EntityFrameworkCore;
using UniGames.Data.Repositories;
using System.Diagnostics;
using UniGames.Api.Repositories;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<GameDbContext>(options => 
options.UseSqlServer(builder.Configuration.GetConnectionString("UniGamesConnectionString")));
// Connects the SQL repository to the I repository -- For Each
builder.Services.AddScoped<IGameRepository, SQLGameRepository>();
builder.Services.AddScoped<IReviewRepository, SQLReviewRepository>();
builder.Services.AddScoped<IUserRepository, SQLUserRepository>();
builder.Services.AddScoped<IGameDetailRepository, SQLGameDetailRepository>();



builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(x =>
    {
        x.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

// Sets the automapper to use the automapper profile in AutoMapping.cs
builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.UseCors();
app.MapControllers();

//This Code below opens the UI as you run the API
// Gains special access to the User folder (the name of the current computer user)
string userProfileFolder = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
// Defines the path for the HTML file
string relativeFilePath = @"source\repos\UniGames\UniGames.UI\index.html";
// Combines both paths together
string htmlFilePath = System.IO.Path.Combine(userProfileFolder, relativeFilePath);
// Forces Google Chrome to open the HTML file in a new tab
string chromeCommand = $"--new-tab \"{htmlFilePath}\"";
// Starts the Chrome process using the chromeCommand
Process.Start(new ProcessStartInfo("chrome.exe", chromeCommand) { UseShellExecute = true });

app.Run();

