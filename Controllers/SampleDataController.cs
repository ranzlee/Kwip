using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Kwip.Domain;
using Kwip.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Kwip.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private IEntityContextProvider _entityContextProvider;
        
        public SampleDataController
        (
            IEntityContextProvider entityContextProvider
        )
        {
            _entityContextProvider = entityContextProvider;
        }

        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<FakeEntity>> FakeEntities()
        {
            using (var context = _entityContextProvider.GetContext())
            {
                //add root
                var fakeRoot = new FakeEntity
                {
                    Name = "Root 1"
                };
                await context.AddAsync(fakeRoot);
                var fakeRoot2 = new FakeEntity
                {
                    Name = "Root 2"
                };
                await context.AddAsync(fakeRoot2);
                //add child
                var fakeChild = new FakeEntity
                {
                    Name = "Child",
                    Parent = fakeRoot,
                    Root = fakeRoot
                };
                await context.AddAsync(fakeChild);
                //add grandchild
                var fakeGrandchild = new FakeEntity
                {
                    Name = "Grandchild",
                    Parent = fakeChild,
                    Root = fakeRoot
                };
                await context.AddAsync(fakeGrandchild);
                await context.SaveChangesAsync();
            }
            using (var context = _entityContextProvider.GetContext())
            {
                var l = await context.FakeEntities
                    .Where(i => i.Parent == null)
                    .AsTracking()
                    .Include(i => i.RootCollection)
                    .ToListAsync();
                return l;
            }
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }
    }
}
