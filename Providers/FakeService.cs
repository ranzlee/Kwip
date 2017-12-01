using Kwip.Services;

namespace Kwip.Providers
{
    public class FakeService : IFakeService
    {
        public string SayHello()
        {
            return "Hello";
        }
    }
}
