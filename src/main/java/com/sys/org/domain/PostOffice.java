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
 * A PostOffice.
 */
@Entity
@Table(name = "post_office")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PostOffice implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    private PoliceStation policeStation;

    @OneToMany(mappedBy = "postOffice")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PremisesBuildingVillage> premisesBuildingVillages = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public PostOffice name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public PoliceStation getPoliceStation() {
        return policeStation;
    }

    public PostOffice policeStation(PoliceStation policeStation) {
        this.policeStation = policeStation;
        return this;
    }

    public void setPoliceStation(PoliceStation policeStation) {
        this.policeStation = policeStation;
    }

    public Set<PremisesBuildingVillage> getPremisesBuildingVillages() {
        return premisesBuildingVillages;
    }

    public PostOffice premisesBuildingVillages(Set<PremisesBuildingVillage> premisesBuildingVillages) {
        this.premisesBuildingVillages = premisesBuildingVillages;
        return this;
    }

    public PostOffice addPremisesBuildingVillage(PremisesBuildingVillage premisesBuildingVillage) {
        this.premisesBuildingVillages.add(premisesBuildingVillage);
        premisesBuildingVillage.setPostOffice(this);
        return this;
    }

    public PostOffice removePremisesBuildingVillage(PremisesBuildingVillage premisesBuildingVillage) {
        this.premisesBuildingVillages.remove(premisesBuildingVillage);
        premisesBuildingVillage.setPostOffice(null);
        return this;
    }

    public void setPremisesBuildingVillages(Set<PremisesBuildingVillage> premisesBuildingVillages) {
        this.premisesBuildingVillages = premisesBuildingVillages;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        PostOffice postOffice = (PostOffice) o;
        if (postOffice.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), postOffice.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PostOffice{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
