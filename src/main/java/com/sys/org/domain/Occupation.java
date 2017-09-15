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
 * A Occupation.
 */
@Entity
@Table(name = "occupation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Occupation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "occupation")
    private String occupation;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "occupation")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Employers> employers = new HashSet<>();

    @OneToMany(mappedBy = "occupation")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<BasicInformation> basicInfos = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOccupation() {
        return occupation;
    }

    public Occupation occupation(String occupation) {
        this.occupation = occupation;
        return this;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getDescription() {
        return description;
    }

    public Occupation description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Employers> getEmployers() {
        return employers;
    }

    public Occupation employers(Set<Employers> employers) {
        this.employers = employers;
        return this;
    }

    public Occupation addEmployers(Employers employers) {
        this.employers.add(employers);
        employers.setOccupation(this);
        return this;
    }

    public Occupation removeEmployers(Employers employers) {
        this.employers.remove(employers);
        employers.setOccupation(null);
        return this;
    }

    public void setEmployers(Set<Employers> employers) {
        this.employers = employers;
    }

    public Set<BasicInformation> getBasicInfos() {
        return basicInfos;
    }

    public Occupation basicInfos(Set<BasicInformation> basicInformations) {
        this.basicInfos = basicInformations;
        return this;
    }

    public Occupation addBasicInfos(BasicInformation basicInformation) {
        this.basicInfos.add(basicInformation);
        basicInformation.setOccupation(this);
        return this;
    }

    public Occupation removeBasicInfos(BasicInformation basicInformation) {
        this.basicInfos.remove(basicInformation);
        basicInformation.setOccupation(null);
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
        Occupation occupation = (Occupation) o;
        if (occupation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), occupation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Occupation{" +
            "id=" + getId() +
            ", occupation='" + getOccupation() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
