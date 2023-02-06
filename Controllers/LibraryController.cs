using E_Library.Model.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace E_Library.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LibraryController : ControllerBase
    {
        private readonly ILibraryService _ILibraryService;

        public LibraryController(ILibraryService prLibraryService)
        {
            _ILibraryService = prLibraryService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Library> IResult = _ILibraryService.GetAll();
            return Ok(IResult);
        }
        [HttpGet]
        public IActionResult Search( string prName)
        {
            List<Library> IResult = _ILibraryService.GetByName(prName);
            return Ok(IResult);
        }

        [HttpPut]
        public IActionResult Update(Library prLibrary)
        {
            
            return Ok(_ILibraryService.Update(prLibrary));
        }

        [HttpPost]
        public IActionResult Save(Library prLibrary)
        {
            return Ok(_ILibraryService.Save(prLibrary));
        }

        [HttpDelete]
        public IActionResult Delete(Library prLibrary)
        {
            _ILibraryService.Delete(prLibrary);
            return Ok();
        }
    }
}
