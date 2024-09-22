using System.Linq.Expressions;
using DentalClinicServer.DTOs;
using Microsoft.EntityFrameworkCore;

namespace DentalClinicServer.Helpers {
    public static class QueryableExtensions {
        private static bool IsNumericType(this Type type) {
            return type.IsPrimitive || type == typeof(decimal);
        }

        public static IQueryable<T> Paginate<T>(this IQueryable<T> queryable, PaginationDto pagination) {
            return queryable.Skip((pagination.Page - 1) * pagination.RecordsPerPage).Take(pagination.RecordsPerPage);
        }

        public static IQueryable<Entity> FilterQuery<Entity>(this IQueryable<Entity> source, QueryFilterDto filter) {
            if (filter.Column == null || filter.Contain == null)
                return source;

            var parameter = Expression.Parameter(typeof(Entity), "e");
            var property = Expression.Property(parameter, filter.Column);
            var value = Expression.Constant(filter.Contain);

            var lambda = property.Type switch {
                Type t when t == typeof(string) => Expression.Lambda<Func<Entity, bool>>(
                    Expression.Call(property, typeof(string).GetMethod("Contains", new[] { typeof(string) })!, value),
                    parameter),
                Type t when t == typeof(Guid) => Expression.Lambda<Func<Entity, bool>>(
                    Expression.Equal(property, Expression.Constant(Guid.Parse(filter.Contain))),
                    parameter),
                Type t when t == typeof(bool) => Expression.Lambda<Func<Entity, bool>>(
                    Expression.Equal(property, Expression.Constant(bool.Parse(filter.Contain))),
                    parameter),
                Type t when t == typeof(DateTime) => Expression.Lambda<Func<Entity, bool>>(
                    Expression.Equal(property, Expression.Constant(DateTime.Parse(filter.Contain))),
                    parameter),
                Type t when t.IsNumericType() => Expression.Lambda<Func<Entity, bool>>(
                    Expression.Equal(property,
                        Expression.Convert(Expression.Constant(Convert.ChangeType(filter.Contain, t)), property.Type)),
                    parameter),
                _ => throw new InvalidOperationException($"Unsupported type: {property.Type.Name}")
            };

            return source.Where(lambda);
        }

        public static IQueryable<TEntity> SortQuery<TEntity>(this IQueryable<TEntity> source, QuerySortDto sort) {
            if (sort.SortColumn == null)
                sort = new QuerySortDto("CreatedAt", "desc");

            string command = sort.Ordering.ToLower() == "asc" ? "OrderBy" : "OrderByDescending";
            var type = typeof(TEntity);
            var parameter = Expression.Parameter(type, "e");
            var property = Expression.Property(parameter, sort.SortColumn);
            var propertyAccess = Expression.MakeMemberAccess(parameter, property.Member);
            var orderByExpression = Expression.Lambda(propertyAccess, parameter);
            var resultExpression = Expression.Call(typeof(Queryable), command,
                new[] { type, property.Type },
                source.AsQueryable().Expression,
                Expression.Quote(orderByExpression));
            return source.AsQueryable().Provider.CreateQuery<TEntity>(resultExpression);
        }

        public static (IQueryable<TEntity> query, PaginationResultDto paginationResultDto)
            GetPagination<TEntity>(this IQueryable<TEntity> source, PaginationDto pagination,
                QueryFilterDto filter, QuerySortDto sort) {
            var query = source.FilterQuery(filter).SortQuery(sort);
            double totalAmountRecords =  source.Count();
            double totalAmountPages = Math.Ceiling(totalAmountRecords / pagination.RecordsPerPage);
            int pageIndex = pagination.Page - 1;

            PaginationResultDto resultDto = new PaginationResultDto() {
                TotalAmountRecords = totalAmountRecords,
                TotalAmountPages = totalAmountPages,
                CurrentPage = pagination.Page,
                RecordsPerPage = pagination.RecordsPerPage,
                PageIndex = pageIndex
            };

            return (query, resultDto);
        }
    }
}
