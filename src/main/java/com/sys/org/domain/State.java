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
 * A State.
 */
@Entity
@Table(name = "state")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class State implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "state")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CityDistrictTown> cityDistrictTowns = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public State name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<CityDistrictTown> getCityDistrictTowns() {
        return cityDistrictTowns;
    }

    public State cityDistrictTowns(Set<CityDistrictTown> cityDistrictTowns) {
        this.cityDistrictTowns = cityDistrictTowns;
        return this;
    }

    public State addCityDistrictTowns(CityDistrictTown cityDistrictTown) {
        this.cityDistrictTowns.add(cityDistrictTown);
        cityDistrictTown.setState(this);
        return this;
    }

    public State removeCityDistrictTowns(CityDistrictTown cityDistrictTown) {
        this.cityDistrictTowns.remove(cityDistrictTown);
        cityDistrictTown.setState(null);
        return this;
    }

    public void setCityDistrictTowns(Set<CityDistrictTown> cityDistrictTowns) {
        this.cityDistrictTowns = cityDistrictTowns;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        State state = (State) o;
        if (state.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), state.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "State{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
