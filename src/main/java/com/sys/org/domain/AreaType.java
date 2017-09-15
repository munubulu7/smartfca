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
 * A AreaType.
 */
@Entity
@Table(name = "area_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AreaType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "areaType")
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

    public AreaType name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<AreaName> getAreaNames() {
        return areaNames;
    }

    public AreaType areaNames(Set<AreaName> areaNames) {
        this.areaNames = areaNames;
        return this;
    }

    public AreaType addAreaNames(AreaName areaName) {
        this.areaNames.add(areaName);
        areaName.setAreaType(this);
        return this;
    }

    public AreaType removeAreaNames(AreaName areaName) {
        this.areaNames.remove(areaName);
        areaName.setAreaType(null);
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
        AreaType areaType = (AreaType) o;
        if (areaType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), areaType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AreaType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
