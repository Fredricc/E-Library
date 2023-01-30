using E_Library.DependencyInjection;
using E_Library.Model.DTO;
using E_Library.Model.Entities;
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
        private ILibraryService _ILibraryService;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IConsoleWriter prIConsoleWriter, ILibraryService prLibraryService)
        {
            _logger = logger;
            _IConsoleWriter = prIConsoleWriter;
            _ILibraryService = prLibraryService;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            //Dependency Injection
            //_IConsoleWriter.write();

            /* GET LIBRARY */
            //List<Library> ILibraries = _ILibraryService.GetAll();
            //List<Library> ILibraries = _ILibraryService.GetByName("OXFORD");

            /* ADD LIBRARY
            Library lNewLibrary = new Library() { Name = "Test Library", Address = "Test Address", Telephone = "234789012" };
            _ILibraryService.Save(lNewLibrary);
            */

            /* UPDATE LIBRARY
            Library lLibraryToUpdate = _ILibraryService.GetByName("Test Library").FirstOrDefault();
            lLibraryToUpdate.Name = "TEST LIBRARY UPDATED";
            _ILibraryService.Update(lLibraryToUpdate);
            */

            /* DELETE LIBRARY */
            Library lLibraryToUpdate = _ILibraryService.GetByName("TEST LIBRARY UPDATED").FirstOrDefault();
            _ILibraryService.Delete(lLibraryToUpdate);

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