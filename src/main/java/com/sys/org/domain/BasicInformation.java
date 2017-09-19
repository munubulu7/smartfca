package com.sys.org.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A BasicInformation.
 */
@Entity
@Table(name = "basic_information")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BasicInformation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "no_of_son")
    private Integer noOfSon;

    @Column(name = "no_of_daughter")
    private Integer noOfDaughter;

    @Column(name = "year_of_employed")
    private LocalDate yearOfEmployed;

    @Column(name = "name_of_organisation")
    private String nameOfOrganisation;

    @Column(name = "establishment")
    private LocalDate establishment;

    @Column(name = "commencement")
    private LocalDate commencement;

    @ManyToOne
    private RegistrationInformation registrationInformation;

    @OneToOne
    @JoinColumn(unique = true)
    private Person name;

    @OneToOne
    @JoinColumn(unique = true)
    private Person father;

    @OneToOne
    @JoinColumn(unique = true)
    private Person mother;

    @OneToMany(mappedBy = "basicInformation")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ContactPerson> contactPersons = new HashSet<>();

    @ManyToOne
    private ResidentialStatus residentialStatus;

    @ManyToOne
    private MaritalStatus maritalStatus;

    @ManyToOne
    private Gender gender;

    @ManyToOne
    private Occupation occupation;

    @ManyToOne
    private Employers employers;

    @ManyToOne
    private OrganisationType organisationType;

    @ManyToOne
    private Sector sector;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public BasicInformation dateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
        return this;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Integer getNoOfSon() {
        return noOfSon;
    }

    public BasicInformation noOfSon(Integer noOfSon) {
        this.noOfSon = noOfSon;
        return this;
    }

    public void setNoOfSon(Integer noOfSon) {
        this.noOfSon = noOfSon;
    }

    public Integer getNoOfDaughter() {
        return noOfDaughter;
    }

    public BasicInformation noOfDaughter(Integer noOfDaughter) {
        this.noOfDaughter = noOfDaughter;
        return this;
    }

    public void setNoOfDaughter(Integer noOfDaughter) {
        this.noOfDaughter = noOfDaughter;
    }

    public LocalDate getYearOfEmployed() {
        return yearOfEmployed;
    }

    public BasicInformation yearOfEmployed(LocalDate yearOfEmployed) {
        this.yearOfEmployed = yearOfEmployed;
        return this;
    }

    public void setYearOfEmployed(LocalDate yearOfEmployed) {
        this.yearOfEmployed = yearOfEmployed;
    }

    public String getNameOfOrganisation() {
        return nameOfOrganisation;
    }

    public BasicInformation nameOfOrganisation(String nameOfOrganisation) {
        this.nameOfOrganisation = nameOfOrganisation;
        return this;
    }

    public void setNameOfOrganisation(String nameOfOrganisation) {
        this.nameOfOrganisation = nameOfOrganisation;
    }

    public LocalDate getEstablishment() {
        return establishment;
    }

    public BasicInformation establishment(LocalDate establishment) {
        this.establishment = establishment;
        return this;
    }

    public void setEstablishment(LocalDate establishment) {
        this.establishment = establishment;
    }

    public LocalDate getCommencement() {
        return commencement;
    }

    public BasicInformation commencement(LocalDate commencement) {
        this.commencement = commencement;
        return this;
    }

    public void setCommencement(LocalDate commencement) {
        this.commencement = commencement;
    }

    public RegistrationInformation getRegistrationInformation() {
        return registrationInformation;
    }

    public BasicInformation registrationInformation(RegistrationInformation registrationInformation) {
        this.registrationInformation = registrationInformation;
        return this;
    }

    public void setRegistrationInformation(RegistrationInformation registrationInformation) {
        this.registrationInformation = registrationInformation;
    }

    public Person getName() {
        return name;
    }

    public BasicInformation name(Person person) {
        this.name = person;
        return this;
    }

    public void setName(Person person) {
        this.name = person;
    }

    public Person getFather() {
        return father;
    }

    public BasicInformation father(Person person) {
        this.father = person;
        return this;
    }

    public void setFather(Person person) {
        this.father = person;
    }

    public Person getMother() {
        return mother;
    }

    public BasicInformation mother(Person person) {
        this.mother = person;
        return this;
    }

    public void setMother(Person person) {
        this.mother = person;
    }

    public Set<ContactPerson> getContactPersons() {
        return contactPersons;
    }

    public BasicInformation contactPersons(Set<ContactPerson> contactPeople) {
        this.contactPersons = contactPeople;
        return this;
    }

    public BasicInformation addContactPersons(ContactPerson contactPerson) {
        this.contactPersons.add(contactPerson);
        contactPerson.setBasicInformation(this);
        return this;
    }

    public BasicInformation removeContactPersons(ContactPerson contactPerson) {
        this.contactPersons.remove(contactPerson);
        contactPerson.setBasicInformation(null);
        return this;
    }

    public void setContactPersons(Set<ContactPerson> contactPeople) {
        this.contactPersons = contactPeople;
    }

    public ResidentialStatus getResidentialStatus() {
        return residentialStatus;
    }

    public BasicInformation residentialStatus(ResidentialStatus residentialStatus) {
        this.residentialStatus = residentialStatus;
        return this;
    }

    public void setResidentialStatus(ResidentialStatus residentialStatus) {
        this.residentialStatus = residentialStatus;
    }

    public MaritalStatus getMaritalStatus() {
        return maritalStatus;
    }

    public BasicInformation maritalStatus(MaritalStatus maritalStatus) {
        this.maritalStatus = maritalStatus;
        return this;
    }

    public void setMaritalStatus(MaritalStatus maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public Gender getGender() {
        return gender;
    }

    public BasicInformation gender(Gender gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Occupation getOccupation() {
        return occupation;
    }

    public BasicInformation occupation(Occupation occupation) {
        this.occupation = occupation;
        return this;
    }

    public void setOccupation(Occupation occupation) {
        this.occupation = occupation;
    }

    public Employers getEmployers() {
        return employers;
    }

    public BasicInformation employers(Employers employers) {
        this.employers = employers;
        return this;
    }

    public void setEmployers(Employers employers) {
        this.employers = employers;
    }

    public OrganisationType getOrganisationType() {
        return organisationType;
    }

    public BasicInformation organisationType(OrganisationType organisationType) {
        this.organisationType = organisationType;
        return this;
    }

    public void setOrganisationType(OrganisationType organisationType) {
        this.organisationType = organisationType;
    }

    public Sector getSector() {
        return sector;
    }

    public BasicInformation sector(Sector sector) {
        this.sector = sector;
        return this;
    }

    public void setSector(Sector sector) {
        this.sector = sector;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        BasicInformation basicInformation = (BasicInformation) o;
        if (basicInformation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), basicInformation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BasicInformation{" +
            "id=" + getId() +
            ", dateOfBirth='" + getDateOfBirth() + "'" +
            ", noOfSon='" + getNoOfSon() + "'" +
            ", noOfDaughter='" + getNoOfDaughter() + "'" +
            ", yearOfEmployed='" + getYearOfEmployed() + "'" +
            ", nameOfOrganisation='" + getNameOfOrganisation() + "'" +
            ", establishment='" + getEstablishment() + "'" +
            ", commencement='" + getCommencement() + "'" +
            "}";
    }
}
