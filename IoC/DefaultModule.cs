using Autofac;
using Kwip.ORM;
using Kwip.Services;

namespace Kwip.IoC
{
    public class DefaultModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            //bind knewt infrastructure providers to service contracts
            builder.RegisterType<EntityContextProvider>().As<IEntityContextProvider>();
        }
    }
}