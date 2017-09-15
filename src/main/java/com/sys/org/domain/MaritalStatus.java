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
 * A MaritalStatus.
 */
@Entity
@Table(name = "marital_status")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MaritalStatus implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "status")
    private String status;

    @OneToMany(mappedBy = "maritalStatus")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<BasicInformation> basicInfos = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public MaritalStatus status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Set<BasicInformation> getBasicInfos() {
        return basicInfos;
    }

    public MaritalStatus basicInfos(Set<BasicInformation> basicInformations) {
        this.basicInfos = basicInformations;
        return this;
    }

    public MaritalStatus addBasicInfos(BasicInformation basicInformation) {
        this.basicInfos.add(basicInformation);
        basicInformation.setMaritalStatus(this);
        return this;
    }

    public MaritalStatus removeBasicInfos(BasicInformation basicInformation) {
        this.basicInfos.remove(basicInformation);
        basicInformation.setMaritalStatus(null);
        return this;
    }

    public void setBasicInfos(Set<BasicInformation> basicInformations) {
        this.basicInfos = basicInformations;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        MaritalStatus maritalStatus = (MaritalStatus) o;
        if (maritalStatus.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), maritalStatus.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MaritalStatus{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
