/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Session;
import java.io.IOException;
import javax.inject.Inject;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebFilter("/Administrador/*")
public class loginFilter implements Filter{

    @Override
    public void init(FilterConfig fc) throws ServletException {
       
    }
    
    @Inject
    LoginController loginController;

    @Override
    public void doFilter(ServletRequest sr, ServletResponse sr1, FilterChain fc) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) sr;
        HttpServletResponse resp = (HttpServletResponse) sr1;
          
         if (loginController != null && loginController.isLogged()) {
             fc.doFilter(req, resp);
         } else {     
             HttpServletResponse res = (HttpServletResponse) resp;
             res.sendRedirect(req.getContextPath() + "/Cliente/Frontend.xhtml");
        }
    }

    @Override
    public void destroy() {
       
    }
    
}
