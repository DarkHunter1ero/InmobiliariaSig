/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Session;

import Usuario.UsuarioController;
import Usuario.UsuarioFacade;
import java.io.IOException;
import java.io.Serializable;
import javax.ejb.EJB;
import javax.enterprise.context.SessionScoped;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.inject.Inject;
import javax.inject.Named;

@Named("loginController")
@SessionScoped
public class LoginController implements Serializable{
    
    private String nick;
    private String pass;
    private boolean logged = false;
    
    @EJB
    private UsuarioFacade ejbFacade;
    
    public boolean isLogged() {
        return logged;
    }

    public void setLogged(boolean logged) {
        this.logged = logged;
    }

    public String getNick() {
        return nick;
    }

    public void setNick(String nick) {
        this.nick = nick;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }
    
    
    
    @Inject
    UsuarioController usuarioController;
    
    public void login() throws IOException{
        if(ejbFacade.validarUsuario(nick, pass)){
            this.logged=true;
            usuarioController.setSelected(ejbFacade.findByNick(nick));
            General.JsfUtil.addSuccessMessage("Usuario logeado correctamente");
            ExternalContext context = FacesContext.getCurrentInstance().getExternalContext();
            context.redirect(context.getRequestContextPath() + "/Administrador/Backend.xhtml");
        }else{
            General.JsfUtil.addSuccessMessage("Error al intentar autenticarse");
            ExternalContext context = FacesContext.getCurrentInstance().getExternalContext();
            context.redirect(context.getRequestContextPath() + "/Cliente/Frontend.xhtml");
            
        }
    }
    
    public void logout() throws IOException {
//        HttpSession session = (HttpSession) FacesContext.getCurrentInstance().getExternalContext().getSession(true);
//        session.invalidate();
        logged = false;
        usuarioController.setSelected(null);
        General.JsfUtil.addSuccessMessage("Usuario deslogeado correctamente");
        ExternalContext context = FacesContext.getCurrentInstance().getExternalContext();
        context.redirect(context.getRequestContextPath() + "/Cliente/Frontend.xhtml");
    }
    
}
