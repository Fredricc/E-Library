using System.Diagnostics;

namespace E_Library.DependencyInjection
{
    public class ConsoleWriter : IConsoleWriter
    {
        public void write()
        {
            Debug.WriteLine("Testing Dependency injection...");
        }
    }
}
