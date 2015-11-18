/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package General;

import java.io.Serializable;
import javax.annotation.PostConstruct;
import javax.faces.view.ViewScoped;
import javax.inject.Named;

@Named("controladorBtn")
@ViewScoped
public class ControladorBtn implements Serializable{
    
    private boolean casa;
    private boolean zona;

    public boolean isCasa() {
        return casa;
    }

    public ControladorBtn() {
    }

    public void setCasa(boolean casa) {
        this.casa = casa;
    }

    public boolean isZona() {
        return zona;
    }

    public void setZona(boolean zona) {
        this.zona = zona;
    }
    
    public void reset(){
        casa = false;
        zona = false;
    }
    
    public void dibujarCasa(){
        reset();
        casa = true;
    }
    
    public void dibujarZona(){
        reset();
        setZona(true);
    }
    @PostConstruct
    void init(){
        reset();
    }
}
