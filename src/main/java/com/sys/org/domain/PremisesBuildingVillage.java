package com.sys.org.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A PremisesBuildingVillage.
 */
@Entity
@Table(name = "premises_building_village")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PremisesBuildingVillage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    private PostOffice postOffice;

    @OneToMany(mappedBy = "premisesBuildingVillage")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Pincode> pincodes = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public PremisesBuildingVillage name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public PostOffice getPostOffice() {
        return postOffice;
    }

    public PremisesBuildingVillage postOffice(PostOffice postOffice) {
        this.postOffice = postOffice;
        return this;
    }

    public void setPostOffice(PostOffice postOffice) {
        this.postOffice = postOffice;
    }

    public Set<Pincode> getPincodes() {
        return pincodes;
    }

    public PremisesBuildingVillage pincodes(Set<Pincode> pincodes) {
        this.pincodes = pincodes;
        return this;
    }

    public PremisesBuildingVillage addPincodes(Pincode pincode) {
        this.pincodes.add(pincode);
        pincode.setPremisesBuildingVillage(this);
        return this;
    }

    public PremisesBuildingVillage removePincodes(Pincode pincode) {
        this.pincodes.remove(pincode);
        pincode.setPremisesBuildingVillage(null);
        return this;
    }

    public void setPincodes(Set<Pincode> pincodes) {
        this.pincodes = pincodes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        PremisesBuildingVillage premisesBuildingVillage = (PremisesBuildingVillage) o;
        if (premisesBuildingVillage.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), premisesBuildingVillage.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PremisesBuildingVillage{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
