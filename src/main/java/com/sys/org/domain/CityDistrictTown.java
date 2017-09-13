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
 * A CityDistrictTown.
 */
@Entity
@Table(name = "city_district_town")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CityDistrictTown implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    private State state;

    @OneToMany(mappedBy = "cityDistrictTown")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AreaName> areaNames = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public CityDistrictTown name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public State getState() {
        return state;
    }

    public CityDistrictTown state(State state) {
        this.state = state;
        return this;
    }

    public void setState(State state) {
        this.state = state;
    }

    public Set<AreaName> getAreaNames() {
        return areaNames;
    }

    public CityDistrictTown areaNames(Set<AreaName> areaNames) {
        this.areaNames = areaNames;
        return this;
    }

    public CityDistrictTown addAreaNames(AreaName areaName) {
        this.areaNames.add(areaName);
        areaName.setCityDistrictTown(this);
        return this;
    }

    public CityDistrictTown removeAreaNames(AreaName areaName) {
        this.areaNames.remove(areaName);
        areaName.setCityDistrictTown(null);
        return this;
    }

    public void setAreaNames(Set<AreaName> areaNames) {
        this.areaNames = areaNames;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CityDistrictTown cityDistrictTown = (CityDistrictTown) o;
        if (cityDistrictTown.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cityDistrictTown.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CityDistrictTown{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
