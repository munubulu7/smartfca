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
 * A AreaName.
 */
@Entity
@Table(name = "area_name")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AreaName implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    private CityDistrictTown cityDistrictTown;

    @OneToMany(mappedBy = "areaName")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PoliceStation> policeStations = new HashSet<>();

    @ManyToOne
    private AreaType areaType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public AreaName name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CityDistrictTown getCityDistrictTown() {
        return cityDistrictTown;
    }

    public AreaName cityDistrictTown(CityDistrictTown cityDistrictTown) {
        this.cityDistrictTown = cityDistrictTown;
        return this;
    }

    public void setCityDistrictTown(CityDistrictTown cityDistrictTown) {
        this.cityDistrictTown = cityDistrictTown;
    }

    public Set<PoliceStation> getPoliceStations() {
        return policeStations;
    }

    public AreaName policeStations(Set<PoliceStation> policeStations) {
        this.policeStations = policeStations;
        return this;
    }

    public AreaName addPoliceStations(PoliceStation policeStation) {
        this.policeStations.add(policeStation);
        policeStation.setAreaName(this);
        return this;
    }

    public AreaName removePoliceStations(PoliceStation policeStation) {
        this.policeStations.remove(policeStation);
        policeStation.setAreaName(null);
        return this;
    }

    public void setPoliceStations(Set<PoliceStation> policeStations) {
        this.policeStations = policeStations;
    }

    public AreaType getAreaType() {
        return areaType;
    }

    public AreaName areaType(AreaType areaType) {
        this.areaType = areaType;
        return this;
    }

    public void setAreaType(AreaType areaType) {
        this.areaType = areaType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AreaName areaName = (AreaName) o;
        if (areaName.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), areaName.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AreaName{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
