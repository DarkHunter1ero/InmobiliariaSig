package Direcciones;

import java.io.Serializable;
import javax.ejb.EJB;
import javax.faces.view.ViewScoped;
import javax.inject.Named;


@Named("direccionController")
@ViewScoped
public class DireccionController implements Serializable {
    @EJB
    DireccionFacade direccionFacade;
    
    private String coordenadas;
    private String direccion;
    
    public void obtenerDireccion(){
    try{
        String[] result = coordenadas.split(",");
        float coordx = Float.valueOf(result[0]);
        float coordy = Float.valueOf(result[1]);
        direccion =  direccionFacade.ObtenerCalleCercana(coordx, coordy);
    }catch(NumberFormatException | NullPointerException ex){
        
    }
        
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
}
