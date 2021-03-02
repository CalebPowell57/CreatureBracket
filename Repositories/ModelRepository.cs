using CreatureBracket.Misc;
using CreatureBracket.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CreatureBracket.Repositories
{
    public class ModelRepository<Model> : BaseRepository where Model : class, IBaseModel
    {
        public ModelRepository(DatabaseContext context) : base(context) { }

        public IQueryable<Model> Get()
        {
            return _context.Set<Model>().AsNoTracking();
        }

        public async Task<Model> GetAsync(Guid id)
        {
            return await _context.Set<Model>()
                .AsNoTracking()
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public virtual async Task PostAsync(Model entity)
        {
            if (_context.Set<Model>().Any(e => e.Id == entity.Id))
            {
                await UpdateAsync(entity as BaseModel);
            }
            else
            {
                await CreateAsync(entity);
            }
        }

        public virtual async Task UpdateAsync(BaseModel entity)
        {
            //CheckPropertyRequirements(entity);

            var original = await _context.Set<Model>().SingleAsync(x => x.Id == entity.Id) as BaseModel;

            original.CopyFrom(entity);
        }

        public virtual async Task CreateAsync(Model entity)
        {
            //CheckPropertyRequirements(entity);

            await _context.Set<Model>().AddAsync(entity);
        }

        public virtual async Task DeleteAsync(Guid id)
        {
            var entity = await GetAsync(id);
            _context.Set<Model>().Remove(entity);
        }

        //private void CheckPropertyRequirements(IBaseEntity entity)
        //{
        //    var properties = entity.GetType().GetProperties();

        //    foreach (var property in properties)
        //    {
        //        if (property.GetCustomAttribute(typeof(EntityPropertyMinLengthAttribute)) is EntityPropertyMinLengthAttribute entityPropertyMinLengthAttribute)
        //        {
        //            var value = property.GetValue(entity);

        //            if (value is null || value.ToString().Length < entityPropertyMinLengthAttribute.MinLength)
        //            {
        //                throw new ExpectedException($"The required minimum length of '{property.Name.UppercaseSplit()}' is {entityPropertyMinLengthAttribute.MinLength}.", ErrorSeverityLevel.Low);
        //            }
        //        }
        //    }
        //}
    }
}
