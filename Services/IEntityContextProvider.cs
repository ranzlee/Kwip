using Kwip.ORM;

namespace Kwip.Services
{
    public interface IEntityContextProvider
    {
        EntityContext GetContext();
    }
}
