using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace DentalClinicServer.Helpers;

public class GlobalRoutePrefixConvention : IApplicationModelConvention {
    private readonly string _prefix;

    public GlobalRoutePrefixConvention(string prefix) {
        _prefix = prefix;
    }

    public void Apply(ApplicationModel app) {
        foreach (var controller in app.Controllers) {
            // Add the prefix to the controller's route
            foreach (var selector in controller.Selectors) {
                selector.AttributeRouteModel = AttributeRouteModel.CombineAttributeRouteModel(
                    new AttributeRouteModel(new RouteAttribute(_prefix)),
                    selector.AttributeRouteModel);
            }
        }
    }
}
