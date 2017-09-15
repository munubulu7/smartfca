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
 * A PoliceStation.
 */
@Entity
@Table(name = "police_station")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PoliceStation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    private AreaName areaName;

    @OneToMany(mappedBy = "policeStation")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PostOffice> postOffices = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public PoliceStation name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public AreaName getAreaName() {
        return areaName;
    }

    public PoliceStation areaName(AreaName areaName) {
        this.areaName = areaName;
        return this;
    }

    public void setAreaName(AreaName areaName) {
        this.areaName = areaName;
    }

    public Set<PostOffice> getPostOffices() {
        return postOffices;
    }

    public PoliceStation postOffices(Set<PostOffice> postOffices) {
        this.postOffices = postOffices;
        return this;
    }

    public PoliceStation addPostOffices(PostOffice postOffice) {
        this.postOffices.add(postOffice);
        postOffice.setPoliceStation(this);
        return this;
    }

    public PoliceStation removePostOffices(PostOffice postOffice) {
        this.postOffices.remove(postOffice);
        postOffice.setPoliceStation(null);
        return this;
    }

    public void setPostOffices(Set<PostOffice> postOffices) {
        this.postOffices = postOffices;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        PoliceStation policeStation = (PoliceStation) o;
        if (policeStation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), policeStation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PoliceStation{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
