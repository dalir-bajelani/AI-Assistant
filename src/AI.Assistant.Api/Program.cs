using FastEndpoints;
using FastEndpoints.Swagger;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddFastEndpoints(o => o.IncludeAbstractValidators = true).SwaggerDocument();

var app = builder.Build();

app.UseFastEndpoints().UseSwaggerGen();
app.UseHttpsRedirection();
app.Run();