using Reinforced.Typings.Fluent;

namespace Kwip
{
    public static class ReinforcedTypingsConfiguration
    {
        public static void Configure(ConfigurationBuilder builder)
        {
            // fluent configuration goes here
            builder.Global(x =>  {
                x.CamelCaseForProperties();
                x.UseModules(true, false);
                x.ExportPureTypings();
                });
        }
    }
}