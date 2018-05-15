package com.saas.appmanage.Interceptor;

import com.saas.appmanage.Auth.AccessPassport;
import org.springframework.util.StringUtils;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class AccessInterceptor implements HandlerInterceptor {

    private String redirectURL;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 验证权限
        if (this.hasPermission(request,handler)) {
            return true;
        }
        //没有权限则重定向至登录界面
        response.sendRedirect(redirectURL);
        return false;
    }

    private boolean hasPermission(HttpServletRequest request,Object handler) {
        HttpSession session = request.getSession();
        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            // 获取方法上的注解
            AccessPassport accessPassport = handlerMethod.getMethod().getAnnotation(AccessPassport.class);
            // 如果方法上的注解为空 则获取类的注解
            if (accessPassport == null) {
                accessPassport = handlerMethod.getMethod().getDeclaringClass().getAnnotation(AccessPassport.class);
            }
            // 如果标记了注解，则判断权限
            if (accessPassport != null && !StringUtils.isEmpty(accessPassport.authorities())) {
                //从session中获取该用户的身份信息 并判断是否有权限
                //如果session中用户身份与注解中对应的所需用户身份相同
                if(accessPassport.authorities().equals((String)session.getAttribute("character"))){
                    System.out.println("URL:" + request.getRequestURI() + "\nAccess passport accepted successfully.\nCharacter:"+ accessPassport.authorities() +"\n");
                    return true;
                }
                //如果seesion中用户身份与注解要求身份不符
                else {
                    //如果注解要求身份为管理员
                    if(accessPassport.authorities().equals("admin")){
                        redirectURL = "/admin/login";
                    }
                    //如果注解要求身份为开发者
                    else if(accessPassport.authorities().equals("company")){
                        redirectURL = "/company/login";
                    }
                    System.out.println("Access passport not accepted.\nCharacter:"+ accessPassport.authorities() +"\nRedirect to:"+redirectURL+"\n");
                    return false;
                }
            }
            //如果未标注权限则直接放行
            else {
                System.out.println("Cannot find @AccessPassport in this URL:" + request.getRequestURI());
                System.out.println("Allow Pass.\n");
                return true;
            }
        }
        return true;
    }
}
