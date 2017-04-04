﻿using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace DEA.Database.Repository
{
    public static class BaseRepository<TEntity> where TEntity : class
    {

        public static async Task InsertAsync(TEntity entity)
        {
            using (var db = new DEAContext())
            {
                db.Set<TEntity>().Add(entity);
                db.Entry(entity).State = EntityState.Added;
                await db.SaveChangesAsync();
            }
        }

        public static async Task UpdateAsync(TEntity entity)
        {
            using (var db = new DEAContext())
            {
                db.Set<TEntity>().Add(entity);
                db.Entry(entity).State = EntityState.Modified;
                await db.SaveChangesAsync();
            }
        }

        public static async Task DeleteAsync(TEntity entity)
        {
            using (var db = new DEAContext())
            {
                db.Set<TEntity>().Remove(entity);
                db.Entry(entity).State = EntityState.Deleted;
                await db.SaveChangesAsync();
            } 
        }

        public static IQueryable<TEntity> GetAll()
        {
            using (var db = new DEAContext())
            {
                return db.Set<TEntity>();
            }   
        }

    }
}