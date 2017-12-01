﻿using Microsoft.Extensions.Configuration;

namespace Kwip.ORM
{
    public static class Startup
    {
        public static void Start(IConfiguration configuration)
        {
            using(var context = new EntityContext(configuration))
            {
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();    
            }
        }
    }
}
