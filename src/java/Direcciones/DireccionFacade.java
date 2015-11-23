/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Direcciones;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import javax.ejb.Stateless;
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

    public String ObtenerCalleCercana(float CoordX, float CoordY){
       String direcc = "";
        try{
            Query query = em.createNativeQuery("SELECT c.\"CALLE\", c.\"NRO\" FROM \"San_Jose_num_puertas\" c WHERE ST_DWithin(ST_Transform(ST_GeomFromText('POINT(" + CoordX+ " " + CoordY + ")', '4326'), 4326), ST_Transform(c.the_geom, '4326'), 25) ORDER BY ST_Distance(ST_Transform(ST_GeomFromText('POINT(" + CoordX+ " " + CoordY + ")', '4326'), 4326), c.the_geom) ASC");
            
            List<Object[]> results = query.getResultList();
            for (Object[] result : results) {
                return result[0] + " " + result[1];
            } 
        }catch(Exception ex){
            System.out.println("Error: "+ ex.getMessage());
        }
        return direcc;
    }
    
    public List<Object[]> ObtenerPropiedadSitioInteres(String distancia, List<String> sitios){
        String tabla = "";
        String TablaWhere = "";
        String SELECT = "SELECT DISTINCT(p.direccion) ";
        String FROM = "FROM \"Propiedad\" p, ";
        String WHERE = " WHERE ";
        String direcc = "";
        
        for (int i = 0; i < sitios.size(); i++) {
            if(sitios.get(i).contains("CentroEducativo")){
                tabla = " \"CentroEducativo\" ce";
                TablaWhere = "ST_DWithin(p.the_geom, ce.the_geom, "+distancia+")";
            }else if(sitios.get(i).contains("negocios")){
                tabla = "negocios n";
                TablaWhere = "ST_DWithin(p.the_geom, n.the_geom, "+distancia+")";
            }else if(sitios.get(i).contains("ServiciosPublicos")){
                tabla = " \"ServiciosPublicos\" sp";
                TablaWhere = "ST_DWithin(p.the_geom, sp.the_geom,  "+distancia+")";
            }else if(sitios.get(i).contains("ServTransporteRecreacion")){
                tabla = " \"ServTransporteRecreacion\" st";
                TablaWhere = "ST_DWithin(p.the_geom, st.the_geom,  "+distancia+")";
            }
            if (i+1 < sitios.size()){
                tabla += ", ";
                TablaWhere += " AND ";
            }
            FROM += tabla;
            WHERE += TablaWhere;
        }
        String QUERY = SELECT + FROM + WHERE;
        try{
            Query query = em.createNativeQuery(QUERY);
            List<Object[]> results = query.getResultList();
            return results;
        }catch(Exception ex){
            System.out.println("Error: "+ ex.getMessage());
            return null;
        }
    }

}
