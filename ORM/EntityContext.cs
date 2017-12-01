using Kwip.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Kwip.ORM
{
    public class EntityContext : DbContext
    {
        readonly IConfiguration _configuration;

        public EntityContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(_configuration.GetConnectionString("DefaultConnection"));
        }

        public DbSet<FakeEntity> FakeEntities { get; set; }
    }
}
