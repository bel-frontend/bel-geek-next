class ApiRoutes {
  private static instance: ApiRoutes;
  public routes: { [key: string]: Function };

  constructor() {
    this.routes = {};
  }

  public static getInstance(): ApiRoutes {
    if (!ApiRoutes.instance) {
      ApiRoutes.instance = new ApiRoutes();
    }
    return ApiRoutes.instance;
  }

  public add(key: string, func: Function): void {
    if (typeof func === "function") {
      if (key in this.routes) {
        console.warn("Check your key! This key is already in use.");
      }
      this.routes[key] = func;
    } else {
      throw new Error("Check your arguments");
    }
  }
}

const apiRoutes = ApiRoutes.getInstance();
export { apiRoutes, ApiRoutes as default };
