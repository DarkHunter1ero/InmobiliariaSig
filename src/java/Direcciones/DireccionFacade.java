/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Direcciones;

import Usuario.*;
import General.AbstractFacade;
import java.util.List;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;


@Stateless
public class DireccionFacade{
    @PersistenceContext(unitName = "InmobiliariaSIGPU")
    private EntityManager em;

    
    public EntityManager getEntityManager() {
        return em;
    }

    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public String ObtenerCalleCercana(float CoordX, float CoordY){
        Query query = em.createNativeQuery("SELECT c.CALLE FROM San_Jose_num_puertas c WHERE ST_DWithin(ST_Transform(ST_GeomFromText('POINT("+CoordX + " " + CoordY + ")', '4326'), 32721), c.the_geom, '25') ORDER BY ST_Distance(ST_Transform(ST_GeomFromText('POINT("+CoordX + " " + CoordY + ")', '4326'), 32721), c.the_geom) ASC");
        try{
            return (String) query.getResultList().get(0);
        }catch(Exception ex){
            System.out.println("Error: "+ ex.getMessage());
        }
        return "";
    }
}
