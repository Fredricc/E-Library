using E_Library.DependencyInjection;
using E_Library.Model.DTO;
using Microsoft.AspNetCore.Mvc;

namespace E_Library.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;
        private IConsoleWriter _IConsoleWriter;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IConsoleWriter prIConsoleWriter)
        {
            _logger = logger;
            _IConsoleWriter = prIConsoleWriter;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            //Dependency Injection
            _IConsoleWriter.write();

            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}