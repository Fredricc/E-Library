using Microsoft.EntityFrameworkCore;

namespace E_Library
{
    public class AppDataContext: DbContext
    {
        public AppDataContext(DbContextOptions<AppDataContext> options) 
            : base(options) 
        {
        
        }
    }
}
