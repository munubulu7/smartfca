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
 * A CenterLocation.
 */
@Entity
@Table(name = "center_location")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CenterLocation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "location_code")
    private String locationCode;

    @Column(name = "drscription")
    private String drscription;

    @OneToMany(mappedBy = "centerLocation")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<RegistrationInformation> regInfos = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocationCode() {
        return locationCode;
    }

    public CenterLocation locationCode(String locationCode) {
        this.locationCode = locationCode;
        return this;
    }

    public void setLocationCode(String locationCode) {
        this.locationCode = locationCode;
    }

    public String getDrscription() {
        return drscription;
    }

    public CenterLocation drscription(String drscription) {
        this.drscription = drscription;
        return this;
    }

    public void setDrscription(String drscription) {
        this.drscription = drscription;
    }

    public Set<RegistrationInformation> getRegInfos() {
        return regInfos;
    }

    public CenterLocation regInfos(Set<RegistrationInformation> registrationInformations) {
        this.regInfos = registrationInformations;
        return this;
    }

    public CenterLocation addRegInfos(RegistrationInformation registrationInformation) {
        this.regInfos.add(registrationInformation);
        registrationInformation.setCenterLocation(this);
        return this;
    }

    public CenterLocation removeRegInfos(RegistrationInformation registrationInformation) {
        this.regInfos.remove(registrationInformation);
        registrationInformation.setCenterLocation(null);
        return this;
    }

    public void setRegInfos(Set<RegistrationInformation> registrationInformations) {
        this.regInfos = registrationInformations;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CenterLocation centerLocation = (CenterLocation) o;
        if (centerLocation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), centerLocation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CenterLocation{" +
            "id=" + getId() +
            ", locationCode='" + getLocationCode() + "'" +
            ", drscription='" + getDrscription() + "'" +
            "}";
    }
}
