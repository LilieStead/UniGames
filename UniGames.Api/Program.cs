using UniGames.Api.Mappings;
using AutoMapper;
using UniGames.Api.Data;
using Microsoft.EntityFrameworkCore;
using UniGames.Data.Repositories;
using UniGames.Api.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<GameDbContext>(options => 
options.UseSqlServer(builder.Configuration.GetConnectionString("UniGamesConnectionString")));
// Connects the SQL repository to the I repository
builder.Services.AddScoped<IGameRepository, SQLGameRepository>();


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

app.Run();