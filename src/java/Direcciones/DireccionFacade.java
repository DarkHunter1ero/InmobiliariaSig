/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Direcciones;

import java.util.List;
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
    
    public String ObtenerPropiedadSitioInteres(float distancia, int id, String[] sitios){
        String t1 = "",t2 = "", t3 = "", t4 = "";
        String t1Where, t2Where, t3Where, t4Where;
       String direcc = "";
        for (int i = 0; i < sitios.length; i++) {
            if(sitios[i].contains("CentroEducativo")){
                t1 = "CentroEducativo ce";
                t1Where = "ST_DWithin(p.the_geom, ce.the_geom, 300) AND p.gid = "+distancia;
            }else if(sitios[i].contains("negocios")){
                t2 = "negocios n";
                t2Where = "ST_DWithin(p.the_geom, n.the_geom, 300) AND p.gid = "+distancia;
            }else if(sitios[i].contains("ServiciosPublicos")){
                t3 = "ServiciosPublicos sp";
                t3Where = "ST_DWithin(p.the_geom, sp.the_geom, 300) AND p.gid = "+distancia;
            }else if(sitios[i].contains("ServTransporteRecreacion")){
                t4 = "ServTransporteRecreacion st";
                t4Where = "ST_DWithin(p.the_geom, st.the_geom, 300) AND p.gid = "+distancia;
            }
        }
       String tablas = t1 + t2 + t3 + t4;
        try{
            Query query = em.createNativeQuery("SELECT * FROM \"Propiedad\" p, \"CentroEducativo\" ce, \"ServiciosPublicos\" sp WHERE ST_DWithin(p.the_geom, ce.the_geom, 300) AND p.gid = 48");
            
            List<Object[]> results = query.getResultList();
            for (Object[] result : results) {
                return result[0] + " " + result[1];
            } 
        }catch(Exception ex){
            System.out.println("Error: "+ ex.getMessage());
        }
        return direcc;
    }
}
