/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Usuario;
import javax.faces.bean.ViewScoped;
import java.io.Serializable;
import java.util.List;
import javax.inject.Named;

@Named("filterView")
@ViewScoped
public class FilterView implements Serializable{
    /////filtrossssss/////////
    
    private List<Usuario> filteredUsers;

    public List<Usuario> getFilteredUsers() {
        return filteredUsers;
    }

    public void setFilteredUsers(List<Usuario> filteredUsers) {
        this.filteredUsers = filteredUsers;
    }
    
    //////////////////////////
}
