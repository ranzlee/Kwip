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
        readonly IEntityContextProvider _entityContextProvider;
        
        public SampleDataController
        (
            IEntityContextProvider entityContextProvider
        )
        {
            _entityContextProvider = entityContextProvider;
        }

        [HttpPost("[action]")]
        public Task<FakeEntity> AddOrUpdateFakeEntity([FromBody] FakeEntity fakeEntity)
        {
            using (var context = _entityContextProvider.GetContext())
            {
                return context.SaveOrUpdate(fakeEntity);
            }
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<FakeEntity>> GetFakeEntities(int parentId)
        {
            int? pid = null;
            if (parentId != 0) pid = parentId;
            using (var context = _entityContextProvider.GetContext())
            {
                var l = await context.FakeEntities
                    .Where(i => i.ParentId == pid)
                    .AsNoTracking()
                    .ToListAsync();
                return l;
            }
        }
    }
}
