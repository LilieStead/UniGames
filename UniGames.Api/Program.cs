using UniGames.Api.Mappings;
using AutoMapper;
using UniGames.Api.Data;
using Microsoft.EntityFrameworkCore;
using UniGames.Data.Repositories;
using System.Diagnostics;
using UniGames.Api.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System;
using UniGames.Api.Models.Sessions;
using UniGames.Api.Models.Domain;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDistributedMemoryCache();
// Adds session options
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(10);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);


builder.Configuration.Bind("JwtConfig", new JwtConfig());
var jwtConfig = builder.Configuration.Get<JwtConfig>();

//var jwtConfig = new JwtConfig();
builder.Services.Configure<JwtConfig>(builder.Configuration.GetSection("JwtConfig"));


builder.Services.AddSingleton(jwtConfig);
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        Console.WriteLine("Setting up JWT authentication");
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = false,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("kJzRYdJJUhdq4WgEy0b9776inofSohUC7uuNZkhwwE4=")),
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true
        };
    });


builder.Services.AddDbContext<GameDbContext>(options => 
options.UseSqlServer(builder.Configuration.GetConnectionString("UniGamesConnectionString")));
// Connects the SQL repository to the I repository -- For Each
builder.Services.AddScoped<IGameRepository, SQLGameRepository>();
builder.Services.AddScoped<IReviewRepository, SQLReviewRepository>();
builder.Services.AddScoped<IUserRepository, SQLUserRepository>();
builder.Services.AddScoped<IGameDetailRepository, SQLGameDetailRepository>();
builder.Services.AddScoped<JwtService>();




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

// Uses sessions
app.UseSession();
// Configures the last time the user accesses an API endpoint and prevents session timeout
// Not the best to use for a high volume of requests but this is a small project so it can
//be used for now
/*app.Use((context, next) =>
{
    context.Session.SetString("LastAccessTime", DateTime.UtcNow.ToString("o"));
    return next();
});*/

app.UseAuthentication();
app.UseAuthorization();

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

