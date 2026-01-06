import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const loggingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const clonedReq = req.clone({
    // headers: req.headers.set("Authorization", `Bearer ${'MY_TOKEN_HERE'}`)
  });
  console.log('[Request]:', clonedReq.url);
  return next(clonedReq);
};
