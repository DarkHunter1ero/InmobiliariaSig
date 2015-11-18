/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Usuario;

import General.AbstractFacade;
import java.util.List;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;


@Stateless
public class UsuarioFacade extends AbstractFacade<Usuario> {
    @PersistenceContext(unitName = "InmobiliariaSIGPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public UsuarioFacade() {
        super(Usuario.class);
    }
    
    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public boolean existeUsuario(String nickname) {
        Query query = em.createQuery("SELECT u.nick FROM Usuario u WHERE u.nick = :nick");
        query.setParameter("nick", nickname);
        return (!query.getResultList().isEmpty());
    }
    
    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public boolean validarUsuario(String nick, String password){
        if(existeUsuario(nick)){
            Usuario user = (Usuario)findByNick(nick);
            if(user.getNick().equals(nick) && user.getPass().equals(password)){
               return true; 
            }
        }
        return false;
    }
    
    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public Usuario findByNick(String nickname) {
        Query query = em.createQuery("SELECT u FROM Usuario u WHERE u.nick = :nick");
        query.setParameter("nick", nickname);
        List<Usuario> users = query.getResultList();
        return users.get(0);
    }
    
    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public List<String[]> obtenerNicksYNombres() {
        Query query = em.createQuery("SELECT u FROM Usuario u");
        List<String[]> users = query.getResultList();
        return users;
    }
}
