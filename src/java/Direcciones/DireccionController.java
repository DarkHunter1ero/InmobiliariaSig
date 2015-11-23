package Direcciones;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.EJB;
import javax.faces.view.ViewScoped;
import javax.inject.Named;


@Named("direccionController")
@ViewScoped
public class DireccionController implements Serializable {
    @EJB
    DireccionFacade direccionFacade;
    
    private String coordenadas;
    private String prueba;
    private String direccion;
    private List<String> sitiosInteres = new ArrayList<>();
    private String distancia;
    private String PropiedadesFilter;
    private Boolean servPublicos;
    private Boolean SerTransporte;
    private Boolean comercios;
    private Boolean centroEducativo;
    private String[] nuevo;

    public void obtenerDireccion(){
        try{
            String[] result = coordenadas.split(",");
            float coordx = Float.valueOf(result[0]);
            float coordy = Float.valueOf(result[1]);
            direccion =  direccionFacade.ObtenerCalleCercana(coordx, coordy);
        }catch(NumberFormatException | NullPointerException ex){

        }
        
    }
    
//    public void filtroAvanzado(){
//         try{
//             sitiosInteres.clear();
//            obtenerSitiosInteres();
//            List<Object[]> resultFiltros = direccionFacade.ObtenerPropiedadSitioInteres(distancia, sitiosInteres);
//            resultFiltros.size();
//            
//            
//        }catch(NumberFormatException | NullPointerException ex){
//
//        }    
//    }
    
       public void filtroAvanzado(){
            prueba = "";
            sitiosInteres.clear();
            obtenerSitiosInteres();
            List<Object[]> resultFiltros = direccionFacade.ObtenerPropiedadSitioInteres(distancia, sitiosInteres);
            int i=0;
            for(Object obj : resultFiltros){
                prueba = prueba + obj.toString();
                if(i < resultFiltros.size()-1){
                   prueba = prueba + ",";
                }
            }
    }
    
    public void obtenerSitiosInteres(){        
        if(centroEducativo){
            addSitios("CentroEducativo");
        }
        if(comercios){
            addSitios("negocios");
        }
        if(servPublicos){
            addSitios("ServiciosPublicos");
        }
        if(SerTransporte){
            addSitios("ServTransporteRecreacion");
        }        
    }
    
    public void addSitios(String sitio){
        sitiosInteres.add(sitio);
    }
    
    public String getCoordenadas() {
        return coordenadas;
    }
    
    public void setCoordenadas(String coordenadas) {
        this.coordenadas = coordenadas;
    }
    
    public String getDireccion() {
        return direccion;
    }
    
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getDistancia() {
        return distancia;
    }

    public void setDistancia(String distancia) {
        this.distancia = distancia;
    }

    public String getPropiedadesFilter() {
        return PropiedadesFilter;
    }

    public void setPropiedadesFilter(String PropiedadesFilter) {
        this.PropiedadesFilter = PropiedadesFilter;
    }

    public Boolean getSerTransporte() {
        return SerTransporte;
    }

    public void setSerTransporte(Boolean SerTransporte) {
        this.SerTransporte = SerTransporte;
    }

    public Boolean getComercios() {
        return comercios;
    }

    public void setComercios(Boolean comercios) {
        this.comercios = comercios;
    }

    public Boolean getCentroEducativo() {
        return centroEducativo;
    }

    public void setCentroEducativo(Boolean centroEducativo) {
        this.centroEducativo = centroEducativo;
    }

    public Boolean getServPublicos() {
        return servPublicos;
    }

    public void setServPublicos(Boolean servPublicos) {
        this.servPublicos = servPublicos;
    }

    public List<String> getSitiosInteres() {
        return sitiosInteres;
    }

    public void setSitiosInteres(List<String> sitiosInteres) {
        this.sitiosInteres = sitiosInteres;
    }

    public String[] getNuevo() {
        return nuevo;
    }

    public void setNuevo(String[] nuevo) {
        this.nuevo = nuevo;
    }

    public String getPrueba() {
        return prueba;
    }

    public void setPrueba(String prueba) {
        this.prueba = prueba;
    }
    
}
