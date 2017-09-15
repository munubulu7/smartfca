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
 * A Gender.
 */
@Entity
@Table(name = "gender")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Gender implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "gender")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<BasicInformation> basicInfos = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Gender name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<BasicInformation> getBasicInfos() {
        return basicInfos;
    }

    public Gender basicInfos(Set<BasicInformation> basicInformations) {
        this.basicInfos = basicInformations;
        return this;
    }

    public Gender addBasicInfos(BasicInformation basicInformation) {
        this.basicInfos.add(basicInformation);
        basicInformation.setGender(this);
        return this;
    }

    public Gender removeBasicInfos(BasicInformation basicInformation) {
        this.basicInfos.remove(basicInformation);
        basicInformation.setGender(null);
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
        Gender gender = (Gender) o;
        if (gender.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gender.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Gender{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
