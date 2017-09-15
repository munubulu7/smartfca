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
 * A RegistrationType.
 */
@Entity
@Table(name = "registration_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RegistrationType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "jhi_type")
    private String type;

    @Column(name = "drscription")
    private String drscription;

    @OneToMany(mappedBy = "registrationType")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<RegistrationInformation> regInfos = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public RegistrationType type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDrscription() {
        return drscription;
    }

    public RegistrationType drscription(String drscription) {
        this.drscription = drscription;
        return this;
    }

    public void setDrscription(String drscription) {
        this.drscription = drscription;
    }

    public Set<RegistrationInformation> getRegInfos() {
        return regInfos;
    }

    public RegistrationType regInfos(Set<RegistrationInformation> registrationInformations) {
        this.regInfos = registrationInformations;
        return this;
    }

    public RegistrationType addRegInfos(RegistrationInformation registrationInformation) {
        this.regInfos.add(registrationInformation);
        registrationInformation.setRegistrationType(this);
        return this;
    }

    public RegistrationType removeRegInfos(RegistrationInformation registrationInformation) {
        this.regInfos.remove(registrationInformation);
        registrationInformation.setRegistrationType(null);
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
        RegistrationType registrationType = (RegistrationType) o;
        if (registrationType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), registrationType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RegistrationType{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", drscription='" + getDrscription() + "'" +
            "}";
    }
}
