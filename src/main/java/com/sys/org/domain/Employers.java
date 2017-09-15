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
 * A Employers.
 */
@Entity
@Table(name = "employers")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Employers implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @ManyToOne
    private Occupation occupation;

    @OneToMany(mappedBy = "employers")
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

    public Employers name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Employers description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Occupation getOccupation() {
        return occupation;
    }

    public Employers occupation(Occupation occupation) {
        this.occupation = occupation;
        return this;
    }

    public void setOccupation(Occupation occupation) {
        this.occupation = occupation;
    }

    public Set<BasicInformation> getBasicInfos() {
        return basicInfos;
    }

    public Employers basicInfos(Set<BasicInformation> basicInformations) {
        this.basicInfos = basicInformations;
        return this;
    }

    public Employers addBasicInfos(BasicInformation basicInformation) {
        this.basicInfos.add(basicInformation);
        basicInformation.setEmployers(this);
        return this;
    }

    public Employers removeBasicInfos(BasicInformation basicInformation) {
        this.basicInfos.remove(basicInformation);
        basicInformation.setEmployers(null);
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
        Employers employers = (Employers) o;
        if (employers.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), employers.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Employers{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
